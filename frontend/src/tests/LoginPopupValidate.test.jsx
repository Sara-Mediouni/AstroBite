import { afterEach, describe, expect, it, vi } from "vitest";
import LoginPopup from "../components/LoginPopup";
import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/store";
import { Provider } from "react-redux";




describe("Login popup",()=>{
     
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
         const EmailInput=screen.getByPlaceholderText(/Email/)
      fireEvent.change(EmailInput,{
       target:{value:"invalid-email"},
      })
      const loginBtn=screen.getByRole("button",{name:/Log In/})
      fireEvent.click(loginBtn)
      await waitFor(()=>{
       expect(EmailInput.checkValidity()).toBe(false); 
     })
       
       const closeBtn=screen.getByRole("button", {name: /×/})
       fireEvent.click(closeBtn);
       expect(onClosemock).toHaveBeenCalled()

})})