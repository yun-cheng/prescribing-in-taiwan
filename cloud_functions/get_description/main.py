import random
import time
from dotenv import load_dotenv
import functions_framework
from flask import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter
from openai import OpenAI

load_dotenv()

cred = credentials.Certificate('serviceAccountKey.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

client = OpenAI()
MODEL = 'gpt-4-1106-preview'

prompt_version = 240102.01
system_prompt = '''
You are a scholar.
Provide a detailed analysis of the scatter plots on the website in 250 words, focusing exclusively on the trends and patterns observed without giving a general overview of the data structure or background.

You'll get both the raw data and the ATC group of the data.
However, the website users will only view scatter plots, not the raw data.
Each plot represents the data for a specific year, displaying age on the x-axis and percentage on the y-axis.
The color of the scatter points differentiates between Sex.

# Info about data:
- top level keys: year
- second level keys: sex (1:male, 2:female)
- second level values: array of percentages, each corresponding to specific age group (0-9, 10-19, 20-29, 30-39, 40-49, 50-59, 60-69, 70-79, 80-89, 90+), in the same order
- groups with prescribing count<1000 (~0.2% or less) would have the value of null.

# what is shown on the website:
<ATC group that you get from user>
<scatter plots>
Percentages of individuals having been prescribed in 2005, 2010, 2015, and 2020 recorded in the Taiwan National Health Insurance by ATC drug groups and by sex and age.
Y axis shows percentages (%) of individuals having been prescribed for the ATC-specific drug group in the given year by sex and age. Drug groups with prescribing count<1000 (~0.2% or less) are not shown.
<Insert your analysis here, with Markdown format, in bullet points, specifically addressing the observed patterns and trends in the scatter plots without giving a general overview of the data structure or background>
'''

response_header = {
    'Access-Control-Allow-Origin': '*',
    'Connection': 'keep-alive',
    'Transfer-Encoding': 'chunked',
    'keep-alive': 'timeout=5'
}


@functions_framework.http
def get_description(request):
    if request.method == 'GET':
        return ''
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return '', 204, headers

    request_json = request.get_json(silent=True)
    print(request_json)
    user_prompt = request_json.get('prompt')

    q = db.collection('completion') \
        .where(filter=FieldFilter('model', '==', MODEL)) \
        .where(filter=FieldFilter('prompt_version', '==', prompt_version)) \
        .where(filter=FieldFilter('userPrompt', '==', user_prompt)) \
        .limit(1)
    docs = q.stream()
    cached_list = [doc.to_dict() for doc in docs]

    if cached_list:
        cached = cached_list[0].get('completion')

        def generate1():
            for chunk in cached.split(' '):
                yield f'{chunk} '
                delay = random.uniform(0.01, 0.03)
                time.sleep(delay)

        return Response(generate1(), mimetype='text/plain', headers=response_header)

    completion = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        stream=True
    )

    def generate2():
        res = ''
        for chunk in completion:
            content = chunk.choices[0].delta.content
            if content:
                res += content
                yield content

            elif chunk.choices[0].finish_reason == 'stop':
                db.collection('completion').add({
                    'prompt_version': prompt_version,
                    'systemPrompt': system_prompt,
                    'userPrompt': user_prompt,
                    'completion': res,
                    'model': MODEL
                })

    return Response(generate2(), mimetype='text/plain', headers=response_header)
