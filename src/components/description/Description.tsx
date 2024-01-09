function Description() {
  return (
    <div className="mx-auto max-w-3xl leading-7 text-neutral-500">
      <p>
        Percentages of individuals having been prescribed in 2005, 2010, 2015,
        and 2020 recorded in the Taiwan National Health Insurance by ATC drug
        groups and by sex and age.
        <br />Y axis shows percentages (%) of individuals having been prescribed
        for the ATC-specific drug group in the given year by sex and age.
        {` Drug groups with prescribing count<1000 (~0.2% or less) are not shown.`}
        <br />
        See{' '}
        <a
          href="https://www.pleiotropy.co.uk/prescribing-in-taiwan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.pleiotropy.co.uk/prescribing-in-taiwan/
        </a>{' '}
        for more info and citations.
      </p>
    </div>
  );
}

export default Description;