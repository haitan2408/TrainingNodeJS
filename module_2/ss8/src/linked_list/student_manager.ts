import {LinkedList} from "./linked_list";
import {Student} from "./student";

class StudentManager {
    private static students = new LinkedList<Student>();

    static insertFirst(student: Student) {
        this.students.insertFirstNode(student);
    }

    static insertLast(student: Student) {
        this.students.insertLastNode(student);
    }

    static showList() {
        console.log(this.students)
        for (let i = 0; i < this.students.getSize(); i++) {
            console.log(this.students.get(i)?.data.toString())
        }
    }

    static totalStudentsFail() {
        let countStudent = 0;
        for (let i = 0; i < this.students.getSize(); i++) {
            const el = this.students.get(i);
            if (el !== null && el.getData().getScore() <= 5) {
                countStudent++;
            }
        }
        return countStudent;
    }

    static listStudentMaxScore() {
        let el = this.students.get(0);
        if (el != null) {
            let maxScore = el.data.getScore();
            for (let i = 1; i < this.students.getSize(); i++) {
                el = this.students.get(i);
                if (el != null && el.data.getScore() > maxScore) {
                    maxScore = el.data.getScore();
                }
            }
            for (let i = 0; i < this.students.getSize(); i++) {
                el = this.students.get(i);
                if (el != null && el.data.getScore() == maxScore) {
                    console.log(this.students.get(i)?.data.toString())
                }
            }
        }
    }

    static findByName(name: string) {
        for (let i = 0; i < this.students.getSize(); i++) {
            if (this.students.get(i)?.data.getName().includes(name)) {
                console.log(this.students.get(i)?.data.toString())
            }
        }
    }
}

StudentManager.insertFirst(new Student(1, "HaiTT", 7));
StudentManager.insertLast(new Student(2, "TrungDC", 8));
StudentManager.insertLast(new Student(3, "TrungDP", 4));
StudentManager.insertLast(new Student(4, "TienNVT", 3));
StudentManager.showList();
StudentManager.listStudentMaxScore();
StudentManager.findByName("Trung")
