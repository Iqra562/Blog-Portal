import React from "react";
import {useNavigate} from "react-router-dom";
import {UnAuthenticatedRoutesNames} from "../../utilities/util.constant";
import {UtilService} from "../../utilities/util.service";
function  SinglePostLoop({ singlePost }){
    const navigate = useNavigate();
    return(
        <>
        <h2>
            <a className="cursor-pinter" onClick={()=>{navigate(
                UnAuthenticatedRoutesNames.POST_DETAIL.replace(
                    ":id",
                    singlePost?.id
                )
            );
            }}>
                {singlePost?.id}
            </a>
        </h2>
        <p className="lead"> by <a href="#">{singlePost?.post_author} </a>

        </p>
        <p>
            <span className="glyphicon glyphicon-time"></span> Posted On
            &nbsp; {UtilService.convertDateToMyFormat(singlePost?.post_date)}
        </p>
        <hr />
        {
            singlePost?.image?(
                <img onClick={()=>{
                    navigate(
                        UnAuthenticatedRoutesNames.POST_DETAIL.replace(
                            ":id",
                            singlePost?.id
                        )
                    );
                }}  class="img-responsive cursor-pointer"  src={singlePost?.image} alt="" />
            ):(
                <img onClick={()=>{
                    navigate(UnAuthenticatedRoutesNames.POST_DETAIL.replace(
                        ":id",
                        singlePost?.id
                    ));
                }}    class="img-responsive cursor-pointer"
                src={"http://placehold.it/900x300"}
                alt=""/>
            )}
            <hr />
            <p>{singlePost?.post_content}</p>
            <a class="btn btn-primary" href="#">
        Read More <span class="glyphicon glyphicon-chevron-right"></span>
      </a>

      <hr />
        </>
    );

}
export default SinglePostLoop;
