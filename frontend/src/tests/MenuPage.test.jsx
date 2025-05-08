// MenuPage.test.jsx
import { render, screen, fireEvent,  } from "@testing-library/react";

import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StoreContext } from "../context/StoreContext";
import Menu from "../pages/Menu";

vi.mock("axios");

describe("MenuPage", () => {
  const foods = [
    { _id: "1", name: "Sushi Roll",category:"Japanese", price: "15.00", image: "sushi.jpg" },
    { _id: "2", name: "Ramen Bowl",category:"Japanese", price: "12.00", image: "ramen.jpg" },
  ];
  const uniqueCategories = ["Japanese", "Noodles"];


  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/getallcategories")) return Promise.resolve({ data: {uniqueCategories} });
      if (url.includes("/food")) return Promise.resolve({ data: {foods} });
    });
  });


  it("affiche les catégories, les plats et ajoute au panier", async () => {
    const mockAddToCart = vi.fn();

    render(
      <StoreContext.Provider value={{ addToCart: mockAddToCart }}>
        <Menu  />
      </StoreContext.Provider>
    );

    // Vérifie les catégories
    const categoryBtn = await screen.findByRole('button', { name: /japanese/i });
    

    // Clique sur une catégorie
    fireEvent.click(categoryBtn);

    // Vérifie les plats
    const sushi = await screen.findByText(uniqueCategories[0]);
    const ramen = await screen.findByText(uniqueCategories[1]);
    expect(sushi).toBeInTheDocument();
    expect(ramen).toBeInTheDocument();

    // Clic sur le bouton "Add to Order"
    const addBtn = screen.getAllByText("Add to Order")[0];
    fireEvent.click(addBtn);
    expect(mockAddToCart).toHaveBeenCalledWith("1");
  });
});
