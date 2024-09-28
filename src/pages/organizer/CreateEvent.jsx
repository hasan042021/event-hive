import {
  useCreateEventMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
} from "../../features/events/eventsApi";
import Layout from "../../components/common/Layout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "../../features/profile/profileApi";

export default function CreateEvent() {
  const [now, setNow] = useState(false);
  const { data: allTags } = useGetTagsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [createEvent] = useCreateEventMutation();
  const { user } = useSelector((state) => state.auth);
  const { data: organizerInfo, isSuccess } = useGetProfileQuery(user.id, {
    skip: !now,
  });

  useEffect(() => {
    if (isSuccess) setNow(true);
  }, [isSuccess]);
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState();

  const handleTagChange = (event) => {
    const selectedOptions = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => Number(option.value));
    setTags(selectedOptions);
    console.log(typeof selectedOptions);
    console.log(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    formData.append("organizer", user.id);

    createEvent(formData);
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
          </div>

          {/* Thumbnail Input*/}
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
          </div>

          {/* Category Select */}
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
              {categories?.map((cat) => {
                return <option value={cat.id}>{cat.name}</option>;
              })}
            </select>
          </div>

          {/* Tags Input */}
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
            Create Event
          </button>
        </form>
      </div>
    </Layout>
  );
}
