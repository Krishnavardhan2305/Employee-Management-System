import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useGetAllReviews from '../../hooks/UseGetAllReviews';
import '../../assets/styles/EmpWorkReview.css';
import { ADMIN_API_ENDPOINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const EmpWorkReview = () => {
  const navigate=useNavigate();
  const { submittedWorkId, submittedBy, githubLink, title, description } = useSelector(state => state.SubmitWork);
  const organization = useSelector(store => store.admin.organizationId); 
  const employee = useSelector(store => store.employee.employeeId);
  const [newComment, setNewComment] = useState('');
  const [submitError, setSubmitError] = useState('');
  const { comments, setComments, error, loading } = useGetAllReviews(submittedWorkId || null);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!organization) {
      console.error('Organization ID is required.');
      setSubmitError('Organization ID is required.');
      return;
    }
    try {
      const response = await axios.post(`${ADMIN_API_ENDPOINT}/addreview`, {
        organization,
        Reviewedby: employee,
        WorkContent: submittedWorkId,
        ReviewContent: newComment,
      });

      const newCommentObject = {
        _id: response.data.reviewId,
        Reviewedby: { empname: 'You' }, 
        ReviewContent: newComment,
      };

      setComments((prevComments) => [...prevComments, newCommentObject]);
      setNewComment('');
      setSubmitError('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSubmitError('Failed to submit the comment. Please try again.');
    }
  };

  if (!submittedWorkId) {
    return <p>No work has been submitted yet to review.</p>;
  }

  return (
    <div className="emp-work-review-container">
      <button className="submit-button" onClick={()=>navigate("/EmployeeHome")}>Back</button>
      <h2>{title}</h2>
      <p>{description}</p>
      {/* <p><strong>Submitted By:</strong> {submittedBy}</p> */}
      <a href={githubLink} target="_blank" rel="noopener noreferrer">GitHub Link</a>

      <div className="emp-comments-section">
        <h3>Comments:</h3>
        {loading ? (
          <p>Loading comments...</p>
        ) 
         : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="emp-comment-item">
              <p><strong>{comment.Reviewedby.empname}:</strong> {comment.ReviewContent}</p>
            </div>
          ))
        )}
      </div>
      
      <div className="emp-add-comment">
        <h3 style={{color:'white'}}>Add a Comment:</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            id="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="4"
            placeholder="Enter your comment here"
            required
          />
          <button type="submit">Submit</button>
        </form>
        {submitError && <p className="error-message">{submitError}</p>}
      </div>
    </div>
  );
};

export default EmpWorkReview;