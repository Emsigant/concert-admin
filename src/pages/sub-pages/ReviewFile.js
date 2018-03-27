import React from 'react';
let ReviewFile = ({ index, close }) => (
    <div className='review-file-wrapper'>
        <div className="review-file">
            review file: {index}
            <a onClick={() => { close(); }} style={{ float: 'right', cursor: 'pointer' }}>x</a>
        </div>
    </div>
);

export default ReviewFile;