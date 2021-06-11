import React, { useEffect } from 'react'
import './style.css'
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllCategory} from '../../actions'

const SubHeader = (props) => {

    const category=useSelector(state=>state.category);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAllCategory());
    },[])
    const renderCategories = (categories) => {
        let mycategories = [];
        for (let category of categories) {
            mycategories.push(
                <li key={category._id}>
                    {
                        category.parentId?
                        <a 
                        href={`/${category.slug}?cid=${category._id}&type=${category.type}`}
                        >{category.name}
                        </a>:
                        <span>{category.name}</span>
                    }
                    
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        }
        // console.log(mycategories);
        return mycategories;
    }
    return (
        <div className="subHeader">
            <ul>
                {category.categories.length>0?renderCategories(category.categories):null}
            </ul>
        </div>
    )
}

export default SubHeader
