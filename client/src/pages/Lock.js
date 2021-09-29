import { useRef } from "react";
import { useParams  } from "react-router";

export default function Lock() {
  const params = useParams();
  const answerText = useRef();

  const compareTest = (comp, answer) => {
    var correct = false;
    answer.forEach(ans => {
      if (comp.current.value === ans){
        correct = true;
      }
    });

    if (correct) {
      alert("輸入正確，請找關主領取新線索");
    }else {
      alert("輸入錯誤!");
    }
    answerText.current.value = "";
  }

  const checkAns = (e) => {
    e.preventDefault();
    switch (params.id) {
      case 'Ame':
        compareTest(answerText, ["5472"]);
        break;
      case 'As': 
        compareTest(answerText, ["2450"]);
        break; 
      case 'Af': 
        compareTest(answerText, ["2698", "0715"]);
        break; 
      case 'Aus': 
        compareTest(answerText, ["2709"]);
        break;
      case 'Eu': 
        compareTest(answerText, ["2850", "4379"]);
        break;
      default:
        console.log(params.id);
        break;
    }
  }

  return (
    <div className="flex">      
      <form className="py-3 px-4 rounded-lg" onSubmit={checkAns}>
        <input 
          className="w-36 my-2 ml-4" 
          type="text"
          pattern="[0-9][0-9][0-9][0-9]"
          autofocus
          required
          placeholder="請輸入四位數字" 
          title="請輸入四位數字"
          ref={answerText}
        />
        <button className="btn" type="submit"> 上傳 </button>
      </form>
    </div>
  );
}