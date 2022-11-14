import { render, screen } from "@testing-library/react";
import { Posts } from ".";

const props = [
    {
        id: 1,
        title: "title 1",
        body: "body 1",
        img: "img/img1.png"
    },

    {
        id: 2,
        title: "title 2",
        body: "body 2",
        img: "img/img2.png"
    },

    {
        id: 3,
        title: "title 3",
        body: "body 3",
        img: "img/img3.png"
    },
]


describe("<Posts />", () =>{
    it("should render Posts", () =>{
        render(<Posts posts={props}/>);
        expect(screen.getAllByRole("heading", /title/i)).toHaveLength(3);
        expect(screen.getAllByRole("img", /title/i)).toHaveLength(3);
        expect(screen.getAllByText(/body/i)).toHaveLength(3);
    });

    it("should not render posts", () => {
        render(<Posts />);
        expect(screen.queryByRole("heading", /title/i)).not.toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const {container} = render(<Posts {...props}/>);
        expect(container.firstChild).toMatchSnapshot();
    });
});