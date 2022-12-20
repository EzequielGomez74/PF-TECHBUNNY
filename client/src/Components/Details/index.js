import React from "react";

const Description = ({ description }) => {
  //console.log("PROP", description);
  // ej description = [
  //   { p: "Descripción" },
  //   { br: null },
  //   { ul: ["Mother Asus", "Memorias DDR3", "Chipset Intel"] },
  //   { br: null },
  //   { ul: ["Mother Asus", "Memorias DDR3", "Chipset Intel"] },
  //   { p: "fin de descripcion" },
  // ];
  return (
    <div>
      {description &&
        description.map((ele) => {
          const key = Object.keys(ele)[0];
          const value = Object.values(ele)[0];
          switch (key) {
            case "ul":
              return (
                <ul>
                  {value.map((liData) => {
                    return <li>{liData}</li>;
                  })}
                </ul>
              );
            case "p":
              return <p>{value}</p>;
            default:
              return <br />;
          }
        })}
    </div>
  );
};

export default Description;