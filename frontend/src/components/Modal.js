function Modal(props) {

    return (
       <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
           <div className="popup__container">
               <button type="button" className="popup__close" onClick={props.onClose}></button>
               <h3 className="popup__title">{props.title}</h3>
               <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
                   {props.children}
                   <button disabled={!props.activeButton} type="submit" className={`popup__button ${props.activeButton ? '' : 'popup__button_disabled'}`}>Save</button>
               </form>
           </div>
       </div>
    )
   
   };
   
   
   export default Modal;