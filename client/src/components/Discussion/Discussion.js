import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoubts } from "../../actions/doubts";
import Form from "../Form/Form";
import Doubts from "../Doubts/Doubts";

const Discussion = () => {
  const [currentId, setCurrentId] = useState(0);
  const doubts = useSelector((state) => state.doubts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoubts());
  }, [currentId, dispatch]);

  console.log(doubts);

  return <div>
    <Form currentId={currentId} setCurrentId={setCurrentId}></Form >
    <Doubts setCurrentId={setCurrentId} ></Doubts>
  </div>;
};

export default Discussion;
