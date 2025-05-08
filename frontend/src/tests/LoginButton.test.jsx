import { fireEvent, render, screen } from "@testing-library/react"
import Navbar from '../components/Navbar'
import { beforeEach, describe, expect, it, vi } from "vitest"
import { StoreContext } from "../context/StoreContext"
import { MemoryRouter } from "react-router-dom"
import { store } from "../redux/store"
import { Provider } from "react-redux"



describe("Navbar Buttons",()=>{
    const cartItems=vi.fn();
    const onCartclickmock=vi.fn()
    const onMobileMenuClickMock=vi.fn()
    beforeEach(()=>{
        vi.spyOn(Storage.prototype,"getItem").mockImplementation((key)=>{
            if (key==='token') return "456d9q7dqfgd56"
        })
    })
    it("Should open Login Popup",async()=>{
        render(
        <MemoryRouter>
        <Provider store={store}>
        <StoreContext.Provider value={cartItems}>
        <Navbar cartCount={cartItems.length}
        onCartClick={onCartclickmock}
        onMobileMenuClick={onMobileMenuClickMock}/>
        </StoreContext.Provider>
        </Provider>
        </MemoryRouter>
        )

        const loginBtn=screen.getByRole("button",{name: /Login/});
        fireEvent.click(loginBtn);
        const emailinput=screen.getByPlaceholderText(/Email/)
        expect(emailinput).toBeInTheDocument();
    })
})