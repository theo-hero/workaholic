import { ButtonProps } from "../@types/todo";

export default function RoundButton( { whenClicked, image, task, key }: ButtonProps) {
    return (
        <button onClick={ () => console.log(task, key) } className="button-round" >
            <img src={image} alt="X"/>
        </button>
    )
}