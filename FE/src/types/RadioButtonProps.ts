export interface RadioButtonProps {
    title: string;
    isChecked: boolean;
    setIsChecked: (value: boolean) => void;
    name: string;
}