function Die(props){
    const styles = {
            backgroundColor:props.isHeld ? "rgb(60, 255, 60)" : "white"
    }
    return(
            <button 
            className="die"
            style={styles}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with ${props.value}`}
            
            >{props.value}</button>
    )
}
export default Die;