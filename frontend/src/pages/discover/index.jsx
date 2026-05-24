import React, { useEffect} from 'react';
import UserLayout from '@/layout/UserLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '@/config/redux/action/authAction';
import { BASE_URL } from '@/config';
import styles from './style.module.css';
import { useRouter } from 'next/router';

function Discoverpage () {

  const router = useRouter();
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!authState.all_profiles_fetched){
      dispatch(getAllUsers());
    }
  }, []);

  return (
    <UserLayout>
      <DashboardLayout>
        <h1>Discover</h1>
        <div >
          <div className={styles.allUserProfile}>
            {authState.all_profiles_fetched && authState.all_users.map((user)=>{
              return (
                <div onClick={()=>{
                  router.push(`/view_profile/${user.userId.username}`)
                }} key={user._id} className={styles.userCard}>
                  <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt='profile'></img>
                  <div>
                    <h2>{user.userId.name}</h2>
                    <p>{user.userId.username}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  )
}

export default Discoverpage 
