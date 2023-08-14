import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = localStorage.getItem("user");
      console.log(user.username);
      setName(JSON.parse(user).username);
    } else navigate("/login");
  }, [navigate]);
  useEffect(() => {
    if(name)
    axios
      .post("http://192.168.201.47:8000/api/get-todo/", { username: name })
      .then((res) => {
        setTasks(res.data.data);
      });
  }, [name]);

  const handlenewtodo = (e) => {
    setTitle(e.target.value);
  };

  const handleaddclick = () => {
    const data = {
      title: title,
      username: name,
    };

    axios.post("http://192.168.201.47:8000/api/todo/", data).then((res) => {
      toast.success(res.data.message);
      console.log(res.data.message);
      setTitle("");
      if (res.data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    });
  };

  const handeldeletebutton = async (id) => {
    try {
      await axios
        .delete(`http://192.168.201.47:8000/api/delete-todo/${id}/`)
        .then((res) => {
          toast.success("Todo deleted ");
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        });
    } catch (error) {
      toast.error("Error deleting todo");
    }
  };

  const handleeditbutton = (id) => {};
  const handlelogout = () => {
    localStorage.removeItem("user");
    toast.warn("logging out");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };
  const handleenterpress = (e) =>{
    if (e.key==="Enter")
        handleaddclick()
  }

  return (
    <>
      <Container>
        <ToastContainer />
        <div className="navbar">
          <div className="logo_name">
            <img
              src="https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/4a14e7b2de7f6eaf5a6c98cb8c00b8de.png"
              alt=""
            />
            <h1>To-DO List</h1>
          </div>
          <div className="login_signup">
            <span>
              <b>{name}</b>
            </span>
            <span onClick={handlelogout}>Logout</span>
          </div>
        </div>
        <div className="todo_container">
          <div className="heading">
            <h1>TO-DO List</h1>
            <p>A simple To-Do List app made with React and Django</p>
          </div>
          <div className="task_list">
            {tasks.map((task) => {
              return (
                <div className="task" key={task.id}>
                  <div className="check_task">
                    <input type="checkbox" />
                    <h3>{task.title}</h3>
                  </div>

                  <div className="icons">
                    <i
                      class="fa-solid fa-pen"
                      onClick={() => handleeditbutton(task.id)}
                    ></i>
                    <i
                      class="fa-solid fa-trash-can"
                      onClick={() => {
                        handeldeletebutton(task.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="new_todo">
            <h1>New To-do</h1>
            <textarea
              type="text"
              placeholder="Enter your to-do "
              onChange={(e) => handlenewtodo(e)}
              value={title}
              onKeyDown={(e)=>handleenterpress(e)}
            />
            <button onClick={handleaddclick}>Add To-Do</button>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(90deg, #6697af, #7ec6b9, #948484);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .navbar {
    display: flex;
    flex-direction: row;
    background-color: white;
    width: 100%;
    height: 7%;
    position: absolute;
    top: 0;

    .logo_name {
      display: flex;
      flex-direction: row;
      width: 100%;

      align-items: center;

      img {
        height: 90%;
      }

      h1 {
        font-size: 25px;
      }
    }
    .login_signup {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      margin-right: 3%;
      span {
        font-size: 20px;
        color: black;
        font-weight: 500;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
          color: black;
        }
      }
    }
  }
  .todo_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: #f26859;
    font-size: 21px;
    color: white;
    box-shadow: -20px -20px 0px 0px rgba(100, 100, 100, 0.1);

    .heading {
      display: flex;
      flex-direction: column;

      margin: 40px 12px;
      gap: 1rem;
      h1 {
        font-size: 40px;
        font-weight: 500;
      }
      p {
        font-size: 24px;
        font-weight: 400;
        text-decoration: underline;
      }
    }

    .task_list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      height: 300px;
      overflow-y: scroll;
      .task {
        background-color: #fa8679;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 15px 10px;

        .check_task,
        .icons {
          display: flex;
          flex-direction: row;
          gap: 1rem;

          input {
            width: 20px;
          }
          i {
            cursor: pointer;
          }
        }

        button {
          width: 40px;
        }
      }
    }

    .new_todo {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 27px;
      justify-content: left;
      width: 100%;
      padding: 12px;

      h1 {
        font-size: 35px;
        font-weight: 300;
      }
      textarea {
        height: 80px;
        font-size: 22px;
      }
      button {
        width: 25%;
        font-size: 25px;
        padding: 10px 5px;
        color: white;
        background-color: #ef6050;
        border: 1px solid white;
        cursor: pointer;
      }
    }
  }
`;
export default Todo;
