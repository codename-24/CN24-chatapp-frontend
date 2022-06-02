import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { color, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "😡 Fill in all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      // console.log(JSON.stringify(data));
      toast({
        title: "😎 Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "😒 Error Occured!",
        
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="20px" >
      <FormControl id="email">
        <FormLabel></FormLabel>
        <InputGroup size="lg"  >
        <Input focusBorderColor="darkgoldenrod"
          value={email}
          height="60px"
          
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        </InputGroup>
      </FormControl>
      <FormControl id="password">
        <FormLabel></FormLabel>
        <InputGroup size="lg">
          <Input
          focusBorderColor="darkgoldenrod"
            value={password}
            height="60px"
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement  width="4.5rem">
            <Button _focus=" " color="darkgoldenrod" variant="outline" h="1.75rem" border="none" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button _hover={{ bg: 'black', color:"darkgoldenrod"}}
        bg="#333"
        color="white"
        width="80%"
        height="40px"

        style={{ marginTop: 55 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button _hover={{ bg: 'darkgoldenrod', color:"black"}}
        variant="outline"
        borderColor="darkgoldenrod"
        color="darkgoldenrod"
        width="80%"
        onClick={() => {
          setEmail("guest@c24.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
