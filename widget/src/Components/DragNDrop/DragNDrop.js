import React, { useContext, useState, useRef } from 'react';
import classes from './DragNDrop.module.scss';
import styled from "styled-components";
import trash from "../../icons/trash.svg";
import Context from '../utils/Context';
import burger from '../../icons/menu.svg';



const DeleteButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  background-color: inherit;
  background-image: url(${trash});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const Burger = styled.div`
  width: 16px;
  height: 16px;
  background-color: inherit;
  background-image: url(${burger});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: grab;
`;


const DragNDrop = () => {
    const [dragging, setDragging] = useState(false);  //state for styles apply

    const dragItem = useRef();
    const dragNode = useRef();

    const {
        lsState: { storedValue, setStoredValue },
        burgerState: { isBurgerDrag, setBurgerDrag }
    } = useContext(Context);

    const deleteCity = (index) => {
        const newStoredValue = [...storedValue];
        newStoredValue.splice(index, 1);
        setStoredValue(newStoredValue);
    };

    const burgerDragStartHandler = () => {
        setBurgerDrag(true);
    };


    function dragStartHandler(e, index) {

        dragItem.current = index;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', dragEndHandler);
        setTimeout(() => {
            setDragging(true);
        }, 0)

    }

    function dragEndHandler() {
        dragItem.current = null;
        dragNode.current.removeEventListener('dragend', dragEndHandler);
        dragNode.current = null;
        setDragging(false);
        setBurgerDrag(false);
    }

    const dragEnterHandle = (e, cityIndex) => {
        if (e.target.closest(`.${classes.dnd}`) !== dragNode.current) {
            const newList = [...storedValue];
            newList.splice(cityIndex, 0, newList.splice(dragItem.current,1)[0])
            dragItem.current = cityIndex;
            setStoredValue(newList);
        }
    };


    const getStyle = (cityIndex) => {
        let classList = [classes.dnd];
        dragging && cityIndex === dragItem.current ?
            classList.push(classes.current) :
            classList = [classes.dnd];
        return classList.join(' ');
    };

    const getPlug = (cityIndex) => {
        if (dragging && cityIndex === dragItem.current) {
            return <div className={classes.dnd__plug} />
        } else {
            return null;
        }
    };

    return (
        storedValue.map((city, cityIndex) => {
            return (
                <div className={getStyle(cityIndex)}
                     key={city.id}
                     draggable={!!isBurgerDrag}
                     onDragStart={(e) => dragStartHandler(e, cityIndex)}
                     onDragEnter={dragging ? (e) => dragEnterHandle(e, cityIndex) : null}

                >
                    {/*{dragging && <div className={classes.dnd__plug} />}*/}
                    {getPlug(cityIndex)}
                    <Burger
                        onMouseDown={burgerDragStartHandler}/>
                    <div className={classes.dnd__name}>{city.name}</div>
                    <DeleteButton onClick={() => deleteCity(cityIndex)}/>
                </div>
            );
        })
    );

};

export default DragNDrop;
