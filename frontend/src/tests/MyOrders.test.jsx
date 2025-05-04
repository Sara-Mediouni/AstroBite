import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MyOrders from "../pages/MyOrders";

vi.mock("axios");

describe("My orders", () => {
  const fakeOrders = [
    {
      _id: "1",
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
    axios.get.mockImplementation((url) => {
      if (url.includes("/userorders/")) {
        return Promise.resolve({ data: fakeOrders });
      }
    });

    axios.post.mockResolvedValue({ data: { message: "Order cancelled" } });
  });

  it("affiche les commandes et permet d'annuler une commande", async () => {
    render(<MyOrders />);

   // Vérifie que le nom du plat apparaît (plus fiable que l'ID)
   const item = await screen.findByText("Sushi Roll");
   expect(item).toBeInTheDocument();

    // Clique sur le bouton Cancel
    const cancelBtn = screen.getByText("Cancel");
    fireEvent.click(cancelBtn);

    // Attends que l'appel API soit effectué
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/status/1")
      );
    });
  });
});
