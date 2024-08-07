import { ButtonProps } from "../@types/todo";

export default function RoundButton( { whenClicked, image, args }: ButtonProps) {
    return (
        <button onClick={ () => whenClicked(args) } className="button-round" >
            <img src={image} alt="X"/>
        </button>
    )
}