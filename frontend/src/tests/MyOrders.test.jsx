import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MyOrders from "../pages/MyOrders";

 vi.mock("axios");
 axios.post = vi.fn();
describe("My orders", () => {
  const data = [
    {
      _id: "1",
      userId:"120",
      items: [
        {item:{
          _id: "1",
          name: "Sushi Roll",
          category: "Japanese",
          price: "15.00",
          image: "sushi.jpg",
        },}
      ],
      status: "Pending",
      amount: "15.00",
    },
  ];
  
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
    if (key === "user") return "120";
  });
  axios.get.mockImplementation((url) => {
    if (url.includes(`/userorders/${data[0].userId}`)) {
      return Promise.resolve({ data: {data} });
    }
  });
    axios.post.mockResolvedValue({ data: { message: "Order cancelled" } });
  });
  
  it("affiche les commandes et permet d'annuler une commande", async () => {
    render(<MyOrders />);

    const orderCard = await screen.findByTestId("order-1");
    expect(orderCard).toBeInTheDocument();
  
    const cancelButton = screen.getByTestId("cancel-1");
    fireEvent.click(cancelButton);
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/status"),
        expect.objectContaining({ orderId: "1", newStatus: "Cancelled" })
      );
    });
  });
})
