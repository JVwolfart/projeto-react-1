import { render, screen } from "@testing-library/react";
import { PostCard } from "."
import { postCardPropsMock } from "./mock";

describe("<PostCard />", () =>{
    const props = postCardPropsMock;
    it("should render PostCard correctly", () => {
        render(<PostCard {...props}/>);
        expect(screen.getByRole("img", {name: /title1/i})).toHaveAttribute("src", props.cover);
        expect(screen.getByRole("heading", {name: /title1/i})).toBeInTheDocument();
        expect(screen.getByText("body1")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const {container} = render(<PostCard {...props}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
});