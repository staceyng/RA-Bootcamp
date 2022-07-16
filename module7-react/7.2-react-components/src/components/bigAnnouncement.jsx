function BigAnnouncement() {
  const myEl = (
    <div>
      {/* The next line passes the warning prop with value "watch out!" */}
      <BigText warning="watch out!" />
      <p>Lorem Ipsum!!</p>
    </div>
  );
  console.log("myEl:", myEl);
  return myEl;
}

export default BigAnnouncement;
