

const LogoTextElement = ({prefix='', suffix=''}) => {
  return (
    <h1 className="h1_heading pb1 lato-bold" data-centered-text>
      {prefix} <span className="--color-primary">L</span>
      <span className="--color-base">ock</span>
      <span className="--color-primary">B</span>
      <span className="--color-base">ox</span>
      <span className="--color-primary">A</span>
      <span className="--color-primary">PP</span> {suffix}
    </h1>
  );
}


export default LogoTextElement;