/**
 * 自定义SwitchPageBar组件
 * props: 
 *      currentPage:number 当前页码
 *      totalPage:number 总页数
 *      dispatch:function 处理函数，配合redux
 *      action:function 配合redux
 *      match:object 父组件match属性，配合react-router
 *      history:object 父组件history属性
 *      from:string 父组件名称
 *      preLabel:string
 *      nextLabel
 * state: 
 *      pageArr:array[number] 数组 用于渲染select>option 从0开始
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SwitchPageBar extends Component {
    constructor(p) {
        super(p);
        let arr = [];
        for(let i = 0; i < this.props.totalPage;i++) {
            arr.push(i);
        }
        this.state = {
            pageArr: arr
        }
    }
    render() {
        let { currentPage=1, totalPage, dispatch, action, match, from, preLabel='< pre', nextLabel='next >' } = this.props;
        let { pageArr } = this.state;
        return (
            <div className='switch-page-bar'>
            {
                //go pre page
                currentPage === 1 ?
                <span style={{color:'#bbb'}} className='go-next-pre-page'>{preLabel}</span> :
                <Link
                    className='go-next-pre-page'
                    to={`${match.url}${currentPage === 2? '':'/page/'+(currentPage-1)}`}
                    onClick={()=>{dispatch(action(-1))}}
                >{preLabel}</Link>
            }
            {
                //page select
                <select style={{fontSize:'1rem',height:'1.5rem'}} value={currentPage} onChange={(e)=>{
                    let targetPage = +e.target.value;
                    this.props.dispatch(action(targetPage-currentPage));
                    if(targetPage === 1) {
                        this.props.history.push('/'+from);
                    } else {
                        this.props.history.push('/'+from+'/page/'+targetPage);
                    }
                }}>
                    {
                        pageArr.map(item=>(
                            <option key={'option'+(item+1)} value={item+1}>{item+1}</option>
                        ))
                    }
                </select>
            }
            {
                //go next page
                currentPage === totalPage ?
                <span style={{color:'#bbb'}} className='go-next-pre-page'>{nextLabel}</span> :
                <Link
                    className='go-next-pre-page'
                    to={`${match.url}/page/`+(currentPage + 1)}
                    onClick={()=>{dispatch(action(1))}}
                >{nextLabel}</Link>
            }
            </div>
        )
    }
}

SwitchPageBar.propTypes = {
    currentPage: PropTypes.number,
    totalPage: PropTypes.number,
    dispatch: PropTypes.func, 
    action: PropTypes.func, 
    match: PropTypes.object, 
    from: PropTypes.string, 
    preLabel: PropTypes.string,
    nextLabel: PropTypes.string
};