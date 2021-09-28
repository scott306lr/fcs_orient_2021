import { useParams, useRef } from "react";

export default function Lock() {
  const params = useParams();
  const answerText = useRef();

  const checkAns = () => {
    switch (params.num) {
      case '1':
        if (answerText === "12345"){
          alert("輸入正確，請找關主領取新線索");
        }
        break;
      case '2': 
        if (answerText === "23456"){
          alert("輸入正確，請找關主領取新線索");
        }
        break; 
      case '3': 
        if (answerText === "34567"){
          alert("輸入正確，請找關主領取新線索");
        }
        break; 
      case '4': 
        if (answerText === "45678"){
          alert("輸入正確，請找關主領取新線索");
        }
        break;
      case '5': 
        if (answerText === "56789" || answerText === "67890"){
          alert("輸入正確，請找關主領取新線索");
        }
        break;
      default:
        console.log("bug");
        break;
    }
  }

  return (
    <div className="flex w-full py-2">      
      <input className="my-2 ml-4" placeholder="請輸入答案" ref={answerText}/>
      <button className="btn" onClick={checkAns}> 上傳 </button>
    </div>
  );
}