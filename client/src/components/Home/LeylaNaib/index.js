import React,{ useEffect, useState } from "react";
import "./LeylaNaib.scss";

const LeylaNaib = ({ aboutLeila }) => {
  //responsive render
  let matchMedia = window.matchMedia("(max-width: 991px)").matches;

  const [nameLeila, setNameLeila] = useState("");
  const [surnameLeila, setSurnameLeila] = useState("");

  useEffect(() => {
    const leilaData = aboutLeila[0]?.author.split(" ");
    if (leilaData) {
      setNameLeila(leilaData[0]);
      setSurnameLeila(leilaData[1]);
    }
  });

  return (
    <section className="leyla-naib">
      <div className="leyla-naib__name">
        {matchMedia ? (
          <>
            <div className="leyla-naib__mobile">
              <span className="leyla-naib__leyla">{nameLeila}</span>
              <span className="leyla-naib__naib">{surnameLeila}</span>
            </div>
            <span className="leyla-naib__surname">
              {aboutLeila[0]?.titleExtension}
            </span>
          </>
        ) : (
          <>
            <h1>{aboutLeila[0]?.author}</h1>
            <p>{aboutLeila[0]?.titleExtension}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default LeylaNaib;
