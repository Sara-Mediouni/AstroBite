import { beforeEach, describe, expect, it, vi } from "vitest";
import { StoreContext } from "../context/StoreContext";
import CartDrawer from "../components/CartDrawer";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import axios from "axios";
import { render } from "@testing-library/react";

vi.mock("axios");
axios.post = vi.fn();
describe("Cart Drawer", () => {
    const foodlistMock=[
        {_id:"6815c94f2e66b12f423e50c0"},
        {_id:"6815c8db2e66b12f423e50ba"}
    ]
    const mockonClose=vi.fn();
    const totalMock = vi.fn().mockReturnValue(20);
    const mockCartItems=
    {"6815c94f2e66b12f423e50c0":{"quantity":1},
    "6815c8db2e66b12f423e50ba":{"quantity":1}
} 
    beforeEach(()=>{
        vi.spyOn(Storage.prototype,"getItem").mockImplementation((key)=>
       { if (key==="cart") return JSON.stringify(mockCartItems);
        if (key==="user") return "120"
        if (key==="token") return "tokenmochkkdqdj4521148"}
    )
    axios.post.mockResolvedValue( {data: { success: true }})})
    

    it("affiche le contenu du panier et permet de checkout",async()=>{
        render(
    <StoreContext.Provider value={{getTotalCartAmount:totalMock,food_list:foodlistMock }}>
     <CartDrawer onClose={mockonClose} isOpen={true} cart={JSON.stringify(mockCartItems)}/>
    </StoreContext.Provider>
        )

   const checkoutbutton=screen.getByRole("button", { name: /Checkout/i });
   fireEvent.click(checkoutbutton);
 
   await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/place"),
      expect.objectContaining({
        userId: "120",
        amount: 20,
        items: expect.any(Array),
      })
    );
  });
   const closeBtn = screen.getByRole("button", { name: /×/i }); 
   fireEvent.click(closeBtn);
    expect(mockonClose).toHaveBeenCalled();     
})})

