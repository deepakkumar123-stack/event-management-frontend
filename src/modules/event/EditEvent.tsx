import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Tooltip,
  addToast,
} from "@heroui/react";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EventType } from "@/@types/event.type";
import { useFormik } from "formik";
// import { IoAdd } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
// import { useEvent } from "@/store/event.store";
import { validateEventData } from "@/validSchema/event-validation-schema";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/category.service";
import { useParams } from "react-router-dom";
import { getEventById, updateEvent } from "@/services/event.service";
import { CategoryType } from "@/@types/categories.type";
import { FilePondFile } from "filepond";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default function EditEvent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState([]);
  // const [files, setFiles] = useState<FilePondFile[]>([]);
  const [event, setEvent] = useState<EventType>();

  const [files, setFiles] = useState<FilePondFile[]>([]);
  const { id } = useParams();
  if (!id) return <h1>404 Not Found</h1>;

  useEffect(() => {
    if (id) {
      getEventById(id).then(({ data }) => setEvent(data));
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (error) {
      throw new Error("error in fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const initialValues: Partial<EventType> = {
    title: event?.title || "",
    location: event?.location || "",
    description: event?.description || "",
    categories: event?.categories || [],
    bannerUrl: event?.bannerUrl || "",
  };

  const eventFormik = useFormik<Partial<EventType>>({
    enableReinitialize: true,
    initialValues,
    validationSchema: validateEventData,
    onSubmit: async (values, { resetForm }: { resetForm: () => void }) => {
      const formData = new FormData();
      formData.append("title", values.title || "");
      formData.append("location", values.location || "");
      formData.append("description", values.description || "");
      const catIds = values.categories?.map((cat) => cat);
      formData.append("categories", catIds?.join(",") || "");

      if (files && files.length > 0) {
        formData.append("banner", files[0].file);
      }
      try {
        await updateEvent(id, formData);
        resetForm();
        setFiles([]);

        addToast({ title: "Event updated" });
      } catch (error: any) {
        console.error("error in update event::", error);
        addToast({
          title: "Failed to update event",
          description: error,
          color: "danger",
        });
      }
    },
  });

  const checkFormError = (field: keyof EventType): boolean => {
    if (eventFormik.errors[field] && eventFormik.touched[field]) {
      return true;
    } else return false;
  };

  return (
    <>
      {/* <Button color="primary" className="" variant="ghost"></Button> */}

      <Tooltip
        showArrow
        classNames={{
          base: [
            // arrow color
            "before:bg-neutral-400 dark:before:bg-white",
          ],
          content: [
            "py-2 px-4 shadow-xl",
            "text-black bg-gradient-to-br from-white to-neutral-400",
          ],
        }}
        content="Edit your event"
        placement="left"
      >
        <Button
          color="primary"
          size="md"
          onPress={onOpen}
          className="flex items-center gap-2"
        >
          <FiEdit className="text-lg" />
          Edit
        </Button>
      </Tooltip>

      <Drawer
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              // duration: 0.3,
            },
            exit: {
              x: 100,
              opacity: 0,
              // duration: 0.3,
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <h1 className="text-center">Event</h1>
              </DrawerHeader>
              <form onSubmit={eventFormik.handleSubmit}>
                <DrawerBody>
                  <div>
                    <Input
                      label="Title"
                      labelPlacement="outside"
                      placeholder="Enter your title"
                      variant="bordered"
                      {...eventFormik.getFieldProps("title")}
                    />
                    {checkFormError("title") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.title}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Location"
                      labelPlacement="outside"
                      placeholder="Enter your location"
                      variant="bordered"
                      {...eventFormik.getFieldProps("location")}
                    />
                    {checkFormError("location") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.location}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="description">Description</label>
                    <ReactQuill
                      value={eventFormik.values.description}
                      onChange={(value) =>
                        eventFormik.setFieldValue("description", value)
                      }
                      onBlur={() =>
                        eventFormik.setFieldTouched("description", true)
                      }
                    />
                    {checkFormError("description") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.description}
                      </span>
                    )}
                  </div>

                  <div>
                    <Select
                      className="w-full"
                      label="Categories"
                      labelPlacement="outside"
                      placeholder="Select categories"
                      selectionMode="multiple"
                      onSelectionChange={(keys) => {
                        const selectedArray = Array.from(keys) as string[];
                        eventFormik.setFieldValue("categories", selectedArray);
                      }}
                    >
                      {categories?.map((cat: CategoryType) => (
                        <SelectItem key={cat._id}>{cat.name}</SelectItem>
                      ))}
                    </Select>

                    {checkFormError("categories") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.categories}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="files">Upload Image</label>
                    <FilePond
                      files={files}
                      credits={false}
                      allowMultiple={true}
                      maxFiles={1}
                      onupdatefiles={(fileItems) => {
                        setFiles(fileItems);
                        const uploadedUrl = URL.createObjectURL(
                          fileItems[0]?.file
                        );

                        eventFormik.setFieldValue("bannerUrl", uploadedUrl);
                      }}
                      id="bannerUrl"
                      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                    {checkFormError("bannerUrl") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.bannerUrl}
                      </span>
                    )}
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    // onPress={onClose}
                  >
                    Add
                  </Button>
                </DrawerFooter>
              </form>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
