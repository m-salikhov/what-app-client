import { FC } from "react";

const checkLinkOrText = (str: string) => /^http/.test(str);

const Add: FC<{ add: string }> = ({ add }) => {
  return (
    <div className="question__add">
      <p>Раздаточный материал:</p>
      <div className="question__add content">
        {checkLinkOrText(add) ? <img src={add} alt="раздатка" /> : <p>{add}</p>}
      </div>
    </div>
  );
};

export default Add;
