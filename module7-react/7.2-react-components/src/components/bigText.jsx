function BigText(props) {
  // We can access the warning prop passed to BigText from the props object.
  console.log("this is warning:", props.warning);

  return (
    <h1 className="hero-text">
      {/* The CSS class name "warning" is unrelated to the warning prop */}
      Hey <span className="warning">Wow!</span>
    </h1>
  );
}

export default BigText;
