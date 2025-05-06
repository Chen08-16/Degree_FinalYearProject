import { BookOutlined, CommentOutlined, HomeOutlined, QuestionCircleOutlined, ShopOutlined, ShoppingCartOutlined, SolutionOutlined, UserOutlined} from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources:IResourceItem[] = [
    /**
     * A resource in Refine performs these actions
     * list -> get all records [Read]
     * show -> get a single record (Read)
     * create -> create a record (create)
     * edit -> update a record (Update)
     * delete -> delete a record (Delete)
     * or Clone
     */
    {
        name:'Home',
        list:'/',
        meta:{
            label:'Home',
            icon:<HomeOutlined />
        }
        
    },
    {
        name:'Menu',
        list:'/menu',
        show:'/menu/:id',
        create:'/menu/new',
        edit:'/menu/edit/:id',
        meta:{
            label:'Menu',
            icon:<ShopOutlined/>
        }
    },
    {
        name:'Order',
        list:'/order',
        meta:{
            label:'Order',
            icon:<ShoppingCartOutlined />
        }
    },
    {
        name:'Reservation',
        list:'/reservation',
        meta:{
            label:'Reservation',
            icon:<BookOutlined />
        }
    },
    {
        name:'Feedback',
        list:'/feedback',
        meta:{
            label:'Feedback',
            icon:<SolutionOutlined />
        }
    },
    {
        name:'Chat',
        list:'/chat',
        meta:{
            label:'Chat',
            icon:<CommentOutlined />
        }
    },
    {
        name:'FAQ',
        list:'/faq',
        // show:'/profile/:id',
        // create:'/profile/new',
        // edit:'/profile/edit/:id',
        meta:{
            label:'FAQ',
            icon:<QuestionCircleOutlined />
        }
    },
    {
        name:'Profile',
        list:'/profile',
        // show:'/profile/:id',
        // create:'/profile/new',
        // edit:'/profile/edit/:id',
        meta:{
            label:'Profile',
            icon:<UserOutlined/>
        }
    }
]