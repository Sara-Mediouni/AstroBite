import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProfilePage from "../pages/Profile";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { store } from "../redux/store";
import { Provider } from "react-redux";

vi.mock("axios");
axios.put = vi.fn();
axios.get = vi.fn();
const fakeUser = {
  email: "alo@gmail.com",
  phone: "124558",
  fullname: "abc",
  city: "abc",
  address: "abc",
  country: "Tunisia",
};
const updatedUser = {
    email: "alo@gmail.com",
    phone: "124558",
    fullname: "abc",
    city: "abc",
    address: "abc123123",
    country: "Tunisia",
  };
describe("Profile Page", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "user") return "120";
    });
    axios.get.mockResolvedValue({ data: { user: { fakeUser } } });
    axios.put.mockResolvedValue({ data:{success:true, updatedUser } });
  });
  it("should send user's info and permit edit", async () => {
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: /Edit Profile/i }));
    fireEvent.change(screen.getByLabelText("address"), {
      target: { value: "abc123123" },
    });
    const updatebtn = screen.getByRole("button", { name: /Save/ });
    fireEvent.click(updatebtn);
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining("/updateuser"),
        expect.objectContaining({
            address: "abc123123",
        
        })
      );
    });
  });
});
