import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default class Page2 extends React.Component {
  state = {
    items: [1, 2],
    test: true
  }

  add () {
    // const list = this.state.items.push(1)
    this.setState({ items: [...this.state.items, 1] })
  }

  reduce () {
    const list = [...this.state.items]
    list.pop()
    this.setState({ items: list })
  }

  render () {
    return (
      <div>
        <div>Admin Page2</div>
        <div style={{ padding: '15px' }} className="anim-list">
          <div>
            <button onClick={() => this.add()}>add</button>
            <button onClick={() => this.reduce()}>reduce</button>
          </div><br/>

          {/* <TransitionGroup in={false} onEx>
            <CSSTransition>
            {this.state.items.map((e, index) => {
              return (<div className="anim-item" key={ 'k-' + index}>item {index}</div>)
            })}
            </CSSTransition>
          </TransitionGroup> */}
          
          <TransitionGroup>
            {
              this.state.items.map((e, index) => {
                return (
                  <CSSTransition timeout={1000} classNames="fade-in" key={ 'k-' + index}>
                    <div className="anim-item">item {index}</div>
                  </CSSTransition>
                )
              })
            }
          </TransitionGroup>

        </div>
      </div>
    )
  }
}
