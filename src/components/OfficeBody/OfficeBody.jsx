import './OfficeBody.scss';

import React, { Component } from 'react';

import { ClassRoomLayout } from 'layouts/userLayouts/ClassRoomLayout';
import { CoursesLayout } from 'layouts/userLayouts/CoursesLayout';
import { TutorLayout } from 'layouts/userLayouts/TutorLayout';

import { ITutorLayout } from 'layouts/teacherLayouts/ITutorLayout';
import { ClassesLayout } from 'layouts/teacherLayouts/ClassesLayout';
import { SellPlate } from 'components/SellPlate';
import { AdminClassesLayout } from 'layouts/adminLayouts/AdminClassesLayout';
import { AdminCoursesLayout } from 'layouts/adminLayouts/AdminCoursesLayout';
import { AdminTutorsLayout } from 'layouts/adminLayouts/AdminTutorsLayout';
import { AdminUsersLayout } from 'layouts/adminLayouts/AdminUsersLayout';
import { UserProfileLayout } from 'layouts/userLayouts/UserProfileLayout';

import { TeacherProfileLayout } from 'layouts/teacherLayouts/TeacherProfileLayout';
import { AdminDefaultLayout } from 'layouts/adminLayouts/AdminDefaultLayout';
import { AdminSellBoxesLayout } from 'layouts/adminLayouts/AdminSellBoxesLayout';
import { UserSellBoxesLayout } from 'layouts/userLayouts/UserSellBoxesLayout';
import { OrderToPay } from 'components/OrderToPay';

export class OfficeBody extends Component {
  render() {
    const { status, layout } = this.props;
    return (
      <>
        <div className="office-body">
          <section className="office-body-layout">
            {(status.status == 'admin' || status.status == 'esquire') && (
              <AdminDefaultLayout />
            )}
            {layout == 'classRoom' && <ClassRoomLayout />}
            {layout == 'courses' && <CoursesLayout />}
            {layout == 'tutor' && <TutorLayout />}
            {layout == 'iTutor' && <ITutorLayout />}
            {layout == 'classes' && <ClassesLayout />}
            {layout == 'all-classes' && <AdminClassesLayout />}
            {layout == 'all-courses' && <AdminCoursesLayout />}
            {layout == 'all-users' && <AdminUsersLayout />}
            {layout == 'all-tutors' && <AdminTutorsLayout />}
            {layout == 'user-profile' && <UserProfileLayout />}
            {layout == 'sellPage' && <UserSellBoxesLayout />}
            {layout == 'sellBoxes' && <AdminSellBoxesLayout />}
            {layout == 'teacher-profile' && <TeacherProfileLayout />}
            {layout == 'notes' && <OrderToPay />}
          </section>
        </div>
      </>
    );
  }
}
