import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Switcher, Title, Wrapper, Form} from "../components/auth-components";
import GithubButton from "../components/github-btn";


export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {name, value} 
    } = e;
    if(name === "email") {
      setEmail(value);
    }   
    else if(name === "password") {
      setPassword(value);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if(isLoading ||  email === "" || password === "") {return;}
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch(e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false); 
    }
  }

  return (
    <Wrapper>
      <Title>Join X</Title>
      <Form onSubmit={onSubmit}>
        <Input name="email" value={email} placeholder="Email" type="email"  onChange={onChange} required/>
        <Input name="password" value={password} placeholder="Password" type="password" onChange={onChange} required />
        <Input type="submit" value={isLoading ? "Loading..." : "Login"}  />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account? {""} <Link to="/create-account"> Create one &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  )
}