import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LoginPopup from "../components/LoginPopup";
import axios from "axios";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';


vi.mock("axios");
axios.post = vi.fn();
describe("Login popup",()=>{
       beforeEach(()=>{
          axios.post.mockResolvedValue( {data: { success: true }})    
       })
       afterEach(() => vi.clearAllMocks())
       const MockIsOpen=vi.fn();
       const onClosemock=vi.fn();
        
       it("Should send login infos and close popup",async()=>{
const Typemock="Login"
       
       render(
         <MemoryRouter>
         <Provider store={store}>
        <LoginPopup  isOpen={MockIsOpen} onClose={onClosemock}
         type={Typemock} toggleType={Typemock} />
        </Provider> 
        </MemoryRouter>
       )
         
       fireEvent.change(screen.getByPlaceholderText(/Email/i), {
        target: { value: "email@gmail.com" },
       });

        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
       target: { value: "abc123123" },
 });
       const loginBtn=screen.getByRole("button", { name: /Log In/ });
       fireEvent.click(loginBtn);

       await waitFor(()=>{
        expect(axios.post).toHaveBeenCalledWith(
         expect.stringContaining("/login"),
         expect.objectContaining({
          
          email:"email@gmail.com",
          password:"abc123123"
         }
      )
        )
       })



       const closeBtn=screen.getByRole("button", {name: /×/})
       fireEvent.click(closeBtn);
       expect(onClosemock).toHaveBeenCalled()

})
it("Should send SignUp infos and close popup",async()=>{
const Typemock="Signup"
afterEach(() => vi.clearAllMocks())
   render(
     <MemoryRouter>
     <Provider store={store}>
    <LoginPopup  isOpen={MockIsOpen} onClose={onClosemock}
     type={Typemock} toggleType={Typemock} />
    </Provider> 
    </MemoryRouter>
   )
   const user = userEvent.setup();
   const passwordInput = screen.getByPlaceholderText("Password");
   const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
   
   fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "email@gmail.com" },
   });

    fireEvent.change(passwordInput, {
   target: { value: "abc123123" },
});
fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
   target: { value: "abc123123" },
});
fireEvent.change(screen.getByPlaceholderText(/City/i), {
   target: { value: "abc123123" },
});
fireEvent.change(screen.getByPlaceholderText(/Address/i), {
   target: { value: "abc123123" },
});
const select = screen.getByRole("combobox");
await user.selectOptions(select, "France");
fireEvent.change(screen.getByPlaceholderText(/Phone/i), {
   target: { value: "12523123" },
});
fireEvent.change(confirmPasswordInput, {
   target: { value: "12523123" },
});
   const signBtn=screen.getByRole("button", { name: /Sign Up/ });
   fireEvent.click(signBtn);

   await waitFor(()=>{
    expect(axios.post).toHaveBeenCalledWith(
     expect.stringContaining("/register"),
     expect.objectContaining({
      
      email:"email@gmail.com",
      password:"abc123123",
      phone:"12523123",
      city:"abc123123",
      address:"abc123123",
      fullname:"abc123123"
     }
  )
    )
   })



   const closeBtn=screen.getByRole("button", {name: /×/})
   fireEvent.click(closeBtn);
   expect(onClosemock).toHaveBeenCalled()

})})