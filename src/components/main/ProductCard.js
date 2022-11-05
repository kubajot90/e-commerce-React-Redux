import { useEffect, useRef } from 'react';
import classes from './ProductCard.module.css';

const ProductCard =(props)=> {
    const productRef = useRef();
    const requestRef = useRef();

        useEffect(()=>{
            const lastProductIndex = props.productsLength -1;
          if(props.isMove && props.index === lastProductIndex){
            checkPosition();
          }
          if(!props.isMove){
            cancelAnimationFrame(requestRef.current)
        }
        },[props.isMove])

        const checkPosition =()=> {
            if( productRef.current.getBoundingClientRect().right < window.innerWidth - 50){
                            props.onTransformDistance(props.onFirstProductDistance()-50)
                            props.onCanSlideHandler('left', false)
                            props.onCancelAnimation()
                        }
            if( props.onFirstProductDistance() > 50 ){
                            props.onTransformDistance(0)
                            props.onCanSlideHandler('right', false)
                            props.onCancelAnimation()
                        }
               requestRef.current = requestAnimationFrame(checkPosition); 
          }

return (
<div className={classes.productCard} ref={productRef} >
        <div style={{backgroundImage :`url(${props.product.image})`}} className={classes.productImage} alt='product'></div>
    <div className={classes.productDescription}>
        <p className={classes.productTitle}>{props.product.title}</p>
        <p className={classes.productPrice}>{`${props.product.price}zł`}</p>
    </div>
</div>
)
}
export default ProductCard;