// MenuPage.test.jsx
import { render, screen, fireEvent,  } from "@testing-library/react";
import MenuPage from "../pages/Menu";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StoreContext } from "../context/StoreContext";

vi.mock("axios");

describe("MenuPage", () => {
  const fakeFood = [
    { _id: "1", name: "Sushi Roll",category:"Japanese", price: "15.00", image: "sushi.jpg" },
    { _id: "2", name: "Ramen Bowl",category:"Japanese", price: "12.00", image: "ramen.jpg" },
  ];
  const fakeCategories = ["Japanese", "Noodles"];

  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/getallcategories")) return Promise.resolve({ data: fakeCategories });
      if (url.includes("/food")) return Promise.resolve({ data: fakeFood });
    });
  });


  it("affiche les catégories, les plats et ajoute au panier", async () => {
    const mockAddToCart = vi.fn();

    render(
      <StoreContext.Provider value={{ addToCart: mockAddToCart }}>
        <MenuPage />
      </StoreContext.Provider>
    );

    // Vérifie les catégories
    const categoryBtn = await screen.findByText(fakeCategories[0]);
    expect(categoryBtn).toBeInTheDocument();

    // Clique sur une catégorie
    fireEvent.click(categoryBtn);

    // Vérifie les plats
    const sushi = await screen.findByText(fakeFood[0].name);
    const ramen = await screen.findByText(fakeFood[1].name);
    expect(sushi).toBeInTheDocument();
    expect(ramen).toBeInTheDocument();

    // Clic sur le bouton "Add to Order"
    const addBtn = screen.getAllByText("Add to Order")[0];
    fireEvent.click(addBtn);
    expect(mockAddToCart).toHaveBeenCalledWith("1");
  });
});
