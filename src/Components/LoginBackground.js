import React, { useEffect, useState } from 'react';

function LoginBackground() {
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    const firstImage = document.querySelector('.firstImage');
    setTimeout(() => {
      firstImage?.classList.toggle('firstImage');
    }, 5000)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const images = document.querySelectorAll('.background-image');
      images.forEach((image, index) => {
        image.style.opacity = index === currIndex ? '1': '0';
      })
      const newIndex = (currIndex + 1) % 6;
      setCurrIndex(newIndex);
    }, 5000);

    return () => { clearInterval(interval); };
  }, [currIndex])

  return <div className="background-container">
  <div className="background-image" id="images1"></div>
  <div className="background-image" id="images2"></div>
  <div className="background-image" id="images3"></div>
  <div className="background-image" id="images4"></div>
  <div className="background-image" id="images5"></div>
  <div className="background-image firstImage" id="images6"></div>
</div>
}

export default LoginBackground;
