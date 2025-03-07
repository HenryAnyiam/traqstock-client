import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { useForm } from "react-hook-form";
import { addFeeding, getFeeding, handleData, getFlocks, getFeedPurchase } from "../Utils/Funcs";
import { FaEye, FaTimes } from "react-icons/fa";
import Tippy from "@tippyjs/react";


function FarmDataTable() {
  const [reportData, setReportData] = useState([]);
  const [flocks, setFlocks] = useState([]);
  const [feedPurchase, setFeedPurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [item, setItem] = useState(null);

  useEffect(() => {
    Promise.all([getFeeding(), getFlocks(), getFeedPurchase()])
      .then(([feedingRes, flocksRes, feedPurchaseRes]) =>
        Promise.all([
          feedingRes.json(),
          flocksRes.json(),
          feedPurchaseRes.json(),
        ])
      )
      .then(([feedingResData, flocksResData, feedPurchaseResData]) => {
        setReportData(feedingResData);
        setFlocks(flocksResData);
        setFeedPurchase(feedPurchaseResData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [])

  const openViewDetails = (data) => {
    setItem(data);
    const editData = document.getElementById("new-data");
    if (!editData.classList.contains("hidden")) {
      editData.classList.add("hidden");
    }
    toggleViewModal();
  };

  const toggleModal = () => {
    const holdData = document.getElementById("new-data");
    holdData.classList.toggle("hidden");
  };

  const toggleViewModal = () => {
    const holdData = document.getElementById("view-data");
    holdData.classList.toggle("hidden");
  };

  const submitData = async (data) => {
    if (
      !errors.flock &&
      !errors.feed &&
      !errors.feed_weight &&
      !errors.water_qty &&
      !errors.feed_date &&
      !errors.feed_time
    ) {
      const loader = document.getElementById("query-loader");
      const text = document.getElementById("query-text");
      loader.style.display = "flex";
      text.style.display = "none";
      const res = await addFeeding(data);
      handleData(res, loader, text, toast, reset)
        .then((res) => {
          getFeeding()
            .then((res) => {
              res.json().then((data) => {
                setReportData(data);
                setLoading(false);
              });
            })
            .catch((err) => {
              setLoading(false);
            });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          toggleModal();
        });
    }
  }

  if (loading) {
    return <div className='h-full p-4 w-full'>
      <div className='flex justify-between m-2 ml-0'>
        <h2 className='text-3xl'>Feeding</h2>
        <button
          className='fill-black text-black flex w-40 items-center justify-center rounded-lg hover:bg-new-hover-green slate-100 transition-all duration-300 ease-out hover:scale-105'
          onClick={() => toggleModal() }>
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className='h-6 w-6 ml-1'>
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
            <span className='text-sm'>New Record</span>
        </button>
      </div>
      <table className='table-auto w-full border-collapse'>
      <thead className='shadow-lg text-left bg-slate-100 text-black font-bold'>
        <tr className='h-10 text-xs lg:text-sm'>
          <th className='p-2 w-[15%]'>Flock</th>
          <th className='p-2 w-[13%]'>Feed</th>
          <th className='p-2 w-[13%]'>Feed Intake</th>
          <th  className='p-2 w-[13%]'>Feed Date</th>
          <th  className='p-2 w-[5%]'></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="2" className='hidden lg:table-cell'>
            <Loader className='' />
          </td>
          <td colSpan="2" className='hidden lg:table-cell'>
            <Loader className='' />
          </td>
          <td className='table-cell lg:hidden' colSpan="4">
            <Loader className='' />
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  }

  return (
    <div className="h-full p-4 w-full">
      <div className="modal-hold hidden" id="view-data">
        <div className="modal-content">
          <div className="bg-slate-100 shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
            <div className="flex justify-end">
              <button
                className="flex justify-center items-center text-center text-black p-2 mr-4 rounded-xl font-semibold hover:bg-new-green btn-anim"
                onClick={() => {
                  toggleViewModal();
                }}
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-center rounded-xl font-semibold text-black p-1 w-full mb-2 text-xl">
              Feeding Details
            </p>
            <div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Flock Fed:</p>
                <p className="font-semibold text-black p-1 mr-2">
                  {item?.flock_name}
                </p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Feed:</p>
                <p className="font-semibold text-black p-1 mr-2">
                  {item?.feed_name}
                </p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">
                  Feed Weight:
                </p>
                <p className="font-semibold text-black p-1 mr-2">
                  {item?.feed_weight} kg
                </p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Water Qty:</p>
                <p className="font-semibold text-black p-1 mr-2">
                  {item?.water_qty} ltrs
                </p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Date Fed:</p>
                <p className="font-semibold text-black p-1 mr-2">
                  {item?.feed_date}
                </p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Time Fed:</p>
                <p className="font-semibold text-black p-1 mr-2">
                  {item?.feed_time}
                </p>
              </div>
              <div className="m-4 lg:grid lg:grid-cols-2">
                <p className="font-semibold text-black p-1 mr-2">Notes:</p>
                <p className="font-semibold text-black p-1 mr-2">
                  {item?.notes === null ? "No Notes" : item?.notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-hold hidden" id="new-data">
        <div className="modal-content">
          <div className="bg-slate-100 shadow-2xl rounded-xl h-fit w-80 lg:w-fit p-4">
            <div className="flex justify-end">
              <button
                className="flex justify-center items-center text-center text-black p-2 mr-4 rounded-xl font-semibold hover:bg-new-green btn-anim"
                onClick={() => {
                  toggleModal();
                }}
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-center rounded-xl text-black p-1 w-full mb-2 text-xl">
              Add New Record
            </p>
            <form onSubmit={handleSubmit(submitData)} noValidate>
              <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label
                  htmlFor="flock-name"
                  className="font-semibold text-black p-1 mr-2"
                >
                  Flock Fed:
                </label>
                <select
                  id="flock-name"
                  defaultValue="default"
                  {...register("flock", {
                    required: "Select Flock",
                    pattern: {
                      value: /^(?!default$).+$/,
                      message: "Select Flock",
                    },
                  })}
                  className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                >
                  <option value="default" disabled>
                    Flock
                  </option>
                  {flocks.map((flock) => (
                    <option key={flock.id} value={flock.id}>
                      {flock.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-red-600 mb-3 text-center">
                {errors.flock?.message}
              </p>
              <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label
                  htmlFor="feed-name"
                  className="font-semibold text-black p-1 mr-2"
                >
                  Feed Used:
                </label>
                <select
                  id="feed-name"
                  defaultValue="default"
                  {...register("feed", {
                    required: "Select Feed",
                    pattern: {
                      value: /^(?!default$).+$/,
                      message: "Select Feed",
                    },
                  })}
                  className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                >
                  <option value="default" disabled>
                    Feed
                  </option>
                  {feedPurchase.map((purchase) => (
                    <option key={purchase.id} value={purchase.id}>
                      {purchase.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-red-600 mb-3 text-center">
                {errors.feed?.message}
              </p>
              <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label
                  htmlFor="feed_weight"
                  className="font-semibold text-black p-1 mr-2"
                >
                  Feed Intake:
                </label>
                <input
                  type="number"
                  id="feed_weight"
                  placeholder="Feed Intake in Kgs"
                  {...register("feed_weight", { required: "Add Feed intake" })}
                  className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                  required
                />
              </div>
              <p className="text-xs text-red-600 mb-3 text-center">
                {errors.feed_weight?.message}
              </p>
              <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label
                  htmlFor="water_qty"
                  className="font-semibold text-black p-1 mr-2"
                >
                  Water Intake:
                </label>
                <input
                  type="number"
                  id="water_qty"
                  placeholder="Water Intake In Ltrs"
                  {...register("water_qty", { required: "Add Water Intake" })}
                  className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                  required
                />
              </div>
              <p className="text-xs text-red-600 mb-3 text-center">
                {errors.water_qty?.message}
              </p>
              <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label
                  htmlFor="dateFed"
                  className="font-semibold text-black p-1 mr-2"
                >
                  Date Fed:
                </label>
                <input
                  type="date"
                  id="dateFed"
                  placeholder="Feed Date"
                  {...register("feed_date", { required: "Add vaccine" })}
                  className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                  required
                />
              </div>
              <p className="text-xs text-red-600 mb-3 text-center">
                {errors.feed_date?.message}
              </p>
              <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label
                  htmlFor="timeFed"
                  className="font-semibold text-black p-1 mr-2"
                >
                  Time Fed:
                </label>
                <input
                  type="time"
                  id="timeFed"
                  placeholder="Feed Time"
                  {...register("feed_time", { required: "Add vaccine" })}
                  className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                  required
                />
              </div>
              <p className="text-xs text-red-600 mb-3 text-center">
                {errors.feed_time?.message}
              </p>
              <div className="m-4 mb-1 lg:grid lg:grid-cols-3">
                <label
                  htmlFor="note"
                  className="font-semibold text-black p-1 mr-2"
                >
                  Note/Remark:
                </label>
                <textarea
                  id="note"
                  rows="3"
                  placeholder="Note"
                  {...register("note")}
                  className="bg-white border-2 border-black rounded-lg p-1 w-full lg:w-58 focus:outline-0 lg:col-span-2"
                ></textarea>
              </div>
              <div className="m-4 flex justify-center">
                <button
                  type="submit"
                  className="text-center w-full text-white bg-new-green p-2 rounded-xl btn-anim"
                >
                  <div className="dots hidden" id="query-loader">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <span id="query-text">Submit Data</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-between m-2 ml-0">
        <h2 className="text-3xl">Feeding</h2>
        <button
          className="fill-black text-black flex w-40 items-center justify-center rounded-lg hover:bg-new-hover-green slate-100 transition-all duration-300 ease-out hover:scale-105"
          onClick={() => toggleModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-6 w-6 ml-1"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          <span className="text-sm">New Record</span>
        </button>
      </div>
      <table className="table-auto w-full border-collapse">
        <thead className="shadow-lg text-left bg-slate-100 text-black">
          <tr className="h-10 text-xs lg:text-sm">
            <th className="p-2 w-[15%]">Flock</th>
            <th className="p-2 w-[13%]">Feed</th>
            <th className="p-2 w-[13%]">Feed Intake</th>
            <th className="p-2 w-[13%]">Feed Date</th>
            <th className="p-2 w-[5%]"></th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((report, index) => (
            <tr
              key={report.id}
              className="h-10 border-b-2 font-normal text-sm lg:text-base"
            >
              <td className="p-2">{report.flock_name}</td>
              <td className="p-2">{report.feed_name}</td>
              <td className="p-2">{report.feed_weight}</td>
              <td className="p-2">{report.feed_date}</td>
              <td className="p-2">
                <Tippy content="View Full Details">
                  <button
                    aria-label={`View ${report.username}`}
                    onClick={() => openViewDetails(report)}
                  >
                    <FaEye />
                  </button>
                </Tippy>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmDataTable;
