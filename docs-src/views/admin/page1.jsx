import React from 'react'
import QueueAnim from 'rc-queue-anim'

export default function Page1 () {
  return (
    <div>
      <div>Admin Page1</div>
      <div className="anim-list">
        <QueueAnim type="bottom" >
          <div className="anim-item" key="i1">item1</div>
          <div className="anim-item" key="i2">item1</div>
          <div className="anim-item" key="i3">item1</div>
          <div className="anim-item" key="i4">item1</div>
        </QueueAnim>
      </div>
    </div>
  )
}
