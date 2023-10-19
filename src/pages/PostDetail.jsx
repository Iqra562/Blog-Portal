import React, {useMemo} from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PostServices } from "../services/post.services";
import { UtilService } from "../utilities/util.service";
function PostDetail(){
    const {id : postId } = useParams();
    const {data: getPostByIdData} = useQuery(
        ["posts", postId],()=> PostServices.getPostById(postId),
        {
            enabled: Boolean(postId),
        }
    );
    const getPostDataMemo = useMemo(
        ()=> getPostByIdData?.data?.results,[getPostByIdData?.data?.results]
    )
    return <div>
<h1>{getPostDataMemo?.post_title}</h1>

<p className="lead">
    by <a href="#"> {getPostDataMemo?.post_author}</a>
</p>

<hr/>
<p><span className="glyphicon glyphicon-time"></span> Posted on {UtilService.convertDateToMyFormat(getPostDataMemo?.post_date)}</p>

<hr/>
{!getPostDataMemo?.image ?
    (
        <img   className="img-responsive"
        src="http://placehold.it/900x300"
        alt=""/>
    ):(
        <img className="img-responsive" src={getPostDataMemo?.image} />
    )
}
<p className="lead">{getPostDataMemo?.post_content}</p>
<hr/>
<div className="well">
    <h4>Leave a Comment:</h4>
    <form role="form">
        <div className="form-group">
            <textarea className="form-control" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>

<hr/>

<div className="media">
    <a className="pull-left" href="#">
        <img className="media-object" src="http://placehold.it/64x64" alt=""/>
    </a>
    <div className="media-body">
        <h4 className="media-heading">Start Bootstrap
            <small>August 25, 2014 at 9:30 PM</small>
        </h4>
       
    </div>
</div>


</div>
    
}
export default PostDetail;