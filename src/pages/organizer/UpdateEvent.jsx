import React, { useState, useEffect } from "react";
import {
  useGetCategoriesQuery,
  useGetEventQuery,
  useGetTagsQuery,
  useUpdateEventMutation,
} from "../../features/events/eventsApi";
import { useParams } from "react-router-dom";
import Layout from "../../components/common/Layout";

export default function UpdateEvent() {
  const [got, setGot] = useState(false);
  const { eventId } = useParams();
  const { data: eventData } = useGetEventQuery(eventId, { skip: !got });
  const { data: allTags } = useGetTagsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [updateEvent, { data, isError, isLoading }] = useUpdateEventMutation();
  useEffect(() => {
    if (eventId) setGot(true);
    console.log(eventId);
    console.log(eventData);
  }, [eventId]);
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [thumbnail, setThumbnail] = useState(); // Assuming this is a file object
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]); // Assuming this is an array of tag IDs
  const [isPublic, setIsPublic] = useState();
  const [errors, setErrors] = useState({});
  const handleTagChange = (event) => {
    const selectedOptions = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value); // Extract selected tag IDs

    setTags(selectedOptions);
  };

  useEffect(() => {
    console.log(eventData);
    setName(eventData?.name);
    setDate(eventData?.date);
    setTime(eventData?.time);
    setLocation(eventData?.location);
    setThumbnail();
    setDescription(eventData?.description);
    setCategory(eventData?.category.id);
    const t_ids = [];
    eventData?.tags.forEach((t) => {
      t_ids.push(t.id);
    });
    setTags(t_ids);
    setIsPublic(eventData?.is_public);
  }, [eventData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data for API call
    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("is_public", isPublic);

    // Send the data to the API
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const body = { id: eventId, data: formData };
    updateEvent(body);
  };
  return (
    <Layout>
      <div className="flex my-3 flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-3 shadow m-2 space-y-4 "
        >
          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-bold">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Event Name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs">
                {errors.name || "Name is required"}
              </p>
            )}
          </div>

          {/* Date Input */}
          <div className="flex flex-col">
            <label htmlFor="date" className="text-gray-700 font-bold">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.date && (
              <p className="text-red-500 text-xs">
                {errors.date || "Date is required"}
              </p>
            )}
          </div>

          {/* Time Input */}
          <div className="flex flex-col">
            <label htmlFor="time" className="text-gray-700 font-bold">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.time && (
              <p className="text-red-500 text-xs">
                {errors.time || "Time is required"}
              </p>
            )}
          </div>

          {/* Location Input */}
          <div className="flex flex-col">
            <label htmlFor="location" className="text-gray-700 font-bold">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border 
 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Event Location"
              required
            />
            {errors.location && (
              <p className="text-red-500 text-xs">
                {errors.location || "Location is required"}
              </p>
            )}
          </div>

          {/* Thumbnail Input (assuming file upload functionality) */}
          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="text-gray-700 font-bold">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-xs">
                {errors.thumbnail || "Thumbnail is required"}
              </p>
            )}
          </div>

          {/* Description Text Area */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-700 font-bold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border  
 rounded-md px-4 py-2 h-24 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Event Description"
              required
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description || "Description is required"}
              </p>
            )}
          </div>

          {/* Category Select (assuming a dropdown or options) */}
          <div className="flex flex-col">
            <label htmlFor="category" className="text-gray-700 font-bold">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {/* Populate options from your category data */}

              {categories?.map((cat) => {
                return <option value={cat.id}>{cat.name}</option>;
              })}

              {/* ... other category options */}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs">
                {errors.category || "Category is required"}
              </p>
            )}
          </div>

          {/* Tags Input (assuming a multiple-select or tag input) */}
          <div className="flex flex-col">
            <label htmlFor="tags" className="text-gray-700 font-bold">
              Tags
            </label>
            <select
              id="tags"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              multiple
              value={tags}
              onChange={handleTagChange}
            >
              {allTags?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          {/* Is Public Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isPublic" className="text-gray-700 font-bold">
              Is Public
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Event
          </button>
        </form>
      </div>
    </Layout>
  );
}
