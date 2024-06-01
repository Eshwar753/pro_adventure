import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import React from "react";

const Paginate = ({pages, page, isAdmin = false, keyword}) => {
  return (
    
        pages > 1 &&(
            <Pagination>
                {[...Array(pages).keys()].map((x)=> (
                    <LinkContainer to = {
                        !isAdmin ? keyword ? `/search/${keyword}/pages/${x+1}`: `/pages/${x+1}` : `/admin/productlist/pages/${x+1}`
                    }>
                        <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    
  )
};

export default Paginate;
