import React, { useEffect,useState } from 'react'
import { Paper, Grid, Typography, Button, Avatar } from '@material-ui/core'
import AvartarText from '../UI/AvartarText'
import useFriendAction from '../../hooks/useFriendActions'
import { fetchCurrentUser } from '../../services/AuthService'

function Friends({ user }) {

  const { adeleteFriend } = useFriendAction()

  const handleDeleteFriend = (e) => {
    // console.log(e)
    adeleteFriend(e.id);
  }

  let aa;
  async function load(){

    const currentUser = await fetchCurrentUser()
    if (currentUser && currentUser.data){console.log(currentUser.data.user)}
    if(currentUser.data.user.id==user.id)
    {
      aa=1;
      return 1;
    }
    else return 0;
  }
  // console.log(aa); 
  const q= load();
  // console.log(q);

  // console.log(user)
  // let token=0;

  // // const aa = useState();
  // // useEffect(()=>{
  //   const mm = async() => {
  //     const aa= await fetchCurrentUser();
  //     // const {aaa} =await aa;
  //   //  }
  //   //  mm();

  // var result =await fetchCurrentUser(
  //         console.log(result.data.user)
//           if (result.data.user.id == user.id)
//             token = 1;
    
//         }).catch(e => {
//           console.log(e)
//         })
//         console.log(token)
//   }, [])

// console.log(aa.data)
  //   fetchCurrentUser().then(result => {
  //     console.log(result.data.user)
  //     if (result.data.user.id == user.id)
  //       token = 1;

  //   }).catch(e => {
  //     console.log(e)
  //   })
  //   console.log(token)

  // })

// const mmm= fetchCurrentUser().then(result => {return result.data.user.id});
  // function aaaaaa(){
  //   console.log("aaa");

  //   fetchCurrentUser().then(result => {
  //         console.log(result.data.user)
  //         if (result.data.user.id == user.id)
  //           token = 1;
    
  //       }).catch(e => {
  //         console.log(e)
  //       })
  //       console.log(token);
  //   // return 1;
  // }
// console.log(mmm)


  return (
    <Grid container spacing={2}> 
      {user.friends.length === 0 ? <center>No Friends</center> : ""}
      {user.friends &&
        user.friends.map((friend) => (
          <Grid item xs={12} sm={6} md={6} key={friend.id}>
            <Paper
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {friend.profile_pic ? (
                <Avatar src={friend.profile_pic} variant="square" />
              ) : (
                <AvartarText
                  bg={friend.active ? 'seagreen' : 'tomato'}
                  text={friend.name}
                  size={70}
                />
              )}
              <Typography
                style={{ marginTop: '16px', flexGrow: 1 }}
                variant="h5"
                color="inherit"
              >
                {friend.name}
              </Typography>
              <Typography
                style={{ marginTop: '6px', flexGrow: 1 }}
                variant="h6"
                color="inherit"
              >
                {friend.email}
              </Typography>
               {load()}
              {q == 1 ?
                (
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteFriend(friend)}
                    style={{
                      backgroundColor: 'tomato',
                      color: '#fff',
                      marginTop: '16px',
                    }}
                  >
                    Unfriend
                  </Button>
                ) : (null)
                  }

              {/* // <Button
              //   variant="contained"
              //   onClick={() => handleDeleteFriend(friend)}
              //   style={{
              //     backgroundColor: 'tomato',
              //     color: '#fff',
              //     marginTop: '16px',
              //   }}
              // >
              //   Unfriend
              // </Button> */}
            </Paper>
          </Grid>
        ))}
    </Grid>
  )
}


export default Friends