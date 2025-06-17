// export const AddEvents = () => {
//   return <div></div>;
// };

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
  DatePicker,
  Select,
  SelectItem,
  Tooltip,
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
import * as Yup from "yup";
import { EventType } from "@/@types/event.type";
import { useFormik } from "formik";
// import { IoAdd } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
];
// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default function EditEvent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const validateEventData = Yup.object({
    title: Yup.string()
      .required("Event title must be required")
      .min(3, "Event title at least 10 char")
      .max(20, "Name must be less than 20 char"),
    date: Yup.date().required(" date is required"),
    description: Yup.string()
      .required("Decription must be required")
      .min(20, "Decription must be at least 20 characters")
      .max(200, "Decription must be less than 200 char"),
    categories: Yup.string()
      .min(1, "Select at least one category")
      .required("Categories must be required"),
    files: Yup.mixed().required("File is required"),
  });

  const initialValues: Partial<EventType> = {
    title: "",
    date: "",
    description: "",
    categories: "",
    files: "",
  };

  const eventFormik = useFormik<Partial<EventType>>({
    initialValues,
    validationSchema: validateEventData,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
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
        {/* <Button
          className="bg-gradient-to-tr h-16   from-pink-500 to-yellow-500 text-white shadow-lg"
          
          radius="full"
          size="sm"
          variant="shadow"
        >
          <IoAdd />
        </Button> */}
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
                  <div
                    key={"bordered"}
                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                  >
                    <DatePicker
                      label={"Date"}
                      labelPlacement="outside"
                      variant={"bordered"}
                      onChange={(date) =>
                        eventFormik.setFieldValue("date", date)
                      }
                      onBlur={() => eventFormik.setFieldTouched("date", true)}
                    />
                    {checkFormError("date") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.date}
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
                      {...eventFormik.getFieldProps("categories")}
                    >
                      {animals.map((animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
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
                      credits={false}
                      allowMultiple={true}
                      maxFiles={1}
                      onupdatefiles={(fileItems) => {
                        eventFormik.setFieldValue(
                          "files",
                          fileItems.map((f) => f.file)
                        );
                      }}
                      id="files"
                      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                      {...eventFormik.getFieldProps("files")}
                    />
                    {checkFormError("files") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.files}
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
