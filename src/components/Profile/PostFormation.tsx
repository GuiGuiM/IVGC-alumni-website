import firebase from 'firebase';
import React, { createContext, useState, } from 'react';

export interface PostFormation {
  id: string,
  school: string, // School name
  city: string, // City of the school
  title: string, // Title of the diploma
  speciality: string,
  fields: string[],
  startDate: firebase.firestore.Timestamp,
  endDate: firebase.firestore.Timestamp,
}

export const PostFormationContext = createContext<any>({});


export const initPostFormation = {
  id: "",
  school: "",
  city: "",
  title: "",
  speciality: "",
  fields: [],
  startDate: firebase.firestore.Timestamp.now(),
  endDate: firebase.firestore.Timestamp.now(),
};
const PostFormationContextProvider = (props: any) => {

  const [postFormation, setPostFormation]: [PostFormation, Function] = useState(initPostFormation);

  const changeKey = async (key: keyof PostFormation, value: string | number) => {
    await setPostFormation({ ...postFormation, [key]: value });
  }

  return (
    <PostFormationContext.Provider
      value={{
        postFormation,
        setPostFormation,
        changeKey
      }}
    >
      {props.children}
    </PostFormationContext.Provider>
  )
}

export default PostFormationContextProvider;