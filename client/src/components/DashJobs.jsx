import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, Modal, Table } from "flowbite-react";
import {
  HiOutlineExclamationCircle,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const DashJobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState("");
  const [deleteJobSuccess, setDeleteJobSuccess] = useState("");

  const handleShowMore = async () => {
    const startIndex = jobs.length;

    try {
      const res = await fetch(`/api/job/get-jobs?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setJobs((prev) => [...prev, ...data.jobs]);
        if (data.jobs.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteJob = async () => {
    try {
      const res = await fetch(`/api/job/delete/${jobIdToDelete}`, {
        method: "DELETE",
      });

      const data = await res.json(); // Awaiting `res.json()` here
      if (res.ok) {
        setDeleteJobSuccess(res.message);
        setJobs((prev) => prev.filter((job) => job._id !== jobIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/job/get-jobs`);
        const data = await res.json();

        if (res.ok) {
          setJobs(data.jobs);
          if (data.jobs.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchJobs();
    }
  }, [currentUser._id]);

  return (
    <div className="table-auto p-6 scrollbar  scrollbar-track-slate-700 scrollbar-thumb-slate-700 overflow-x-scroll md:overflow-x-auto">
      {/* Add New Job Button */}
      <Button
        gradientDuoTone="greenToBlue"
        size="lg"
        className="flex items-center gap-4 shadow-md hover:scale-105 transition-transform mb-4"
      >
        <HiOutlinePlusCircle className="text-2xl" />
        <Link to="/create-job" className="text-white pl-2">
          Add New Job
        </Link>
      </Button>

      {/* Jobs Table */}
      {currentUser.isAdmin && jobs.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Job title</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Job type</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            {jobs.map((job) => (
              <Table.Body className="divide-y" key={job._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(job.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{job.title}</Table.Cell>
                  <Table.Cell>{job.location}</Table.Cell>
                  <Table.Cell>{job.type}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setJobIdToDelete(job._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-job/${job._id}`}>
                      <span className="text-teal-500 hover:underline">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no jobs yet!</p>
      )}

      {/* Delete Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this job?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteJob}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {deleteJobSuccess && (
        <Alert color="success" className="mt-5">
          {deleteJobSuccess}
        </Alert>
      )}
    </div>
  );
};

export default DashJobs;
